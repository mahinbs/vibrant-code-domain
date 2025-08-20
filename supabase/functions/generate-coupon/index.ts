import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    if (!email) {
      throw new Error("Email is required");
    }

    // Create Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Check if user already has an active coupon
    const { data: existingCoupon } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("email", email)
      .eq("is_used", false)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (existingCoupon) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          coupon: existingCoupon,
          message: "Existing coupon found" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Generate unique coupon code
    const generateCouponCode = () => {
      const prefix = "FREELANCE";
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `${prefix}${randomPart}`;
    };

    let couponCode = generateCouponCode();
    
    // Ensure uniqueness
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing } = await supabaseAdmin
        .from("coupons")
        .select("id")
        .eq("code", couponCode)
        .single();
      
      if (!existing) break;
      
      couponCode = generateCouponCode();
      attempts++;
    }

    // Set expiry to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create new coupon
    const { data: newCoupon, error } = await supabaseAdmin
      .from("coupons")
      .insert({
        code: couponCode,
        email: email,
        expires_at: expiresAt.toISOString(),
        discount_amount: 100, // $1 discount
        discount_type: "fixed",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating coupon:", error);
      throw new Error("Failed to create coupon");
    }

    console.log("Coupon created successfully:", newCoupon);

    return new Response(
      JSON.stringify({ 
        success: true, 
        coupon: newCoupon,
        message: "Coupon generated successfully" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in generate-coupon function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});