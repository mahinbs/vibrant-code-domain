import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  /**
   * Optional id used to deduplicate the script tag if the same block is
   * rendered in multiple places (Helmet will keep the latest one).
   */
  id?: string;
}

/**
 * Tiny helper that injects a `<script type="application/ld+json">` block via
 * react-helmet-async. The script is rendered into <head> and has no visual
 * effect, so it is safe to use on any page.
 */
const JsonLd = ({ data, id }: JsonLdProps) => {
  const json = JSON.stringify(data, (_key, value) => (value === undefined ? null : value));
  return (
    <Helmet>
      <script type="application/ld+json" data-jsonld-id={id}>
        {json}
      </script>
    </Helmet>
  );
};

export default JsonLd;
