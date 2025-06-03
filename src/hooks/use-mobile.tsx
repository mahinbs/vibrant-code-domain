
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT
      console.log('Mobile detection:', { width: window.innerWidth, isMobile: newIsMobile })
      setIsMobile(newIsMobile)
    }
    mql.addEventListener("change", onChange)
    
    // Initial check
    const initialIsMobile = window.innerWidth < MOBILE_BREAKPOINT
    console.log('Initial mobile detection:', { width: window.innerWidth, isMobile: initialIsMobile })
    setIsMobile(initialIsMobile)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
