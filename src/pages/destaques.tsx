import Head from 'next/head';
import Image from 'next/image';

// Styles
import styles from "@styles/pages/home.module.scss";

// Data
import productsData from "@mock/data.json";

// Utils
import { formatPrice } from '@utils/formatPrice';

export const Destaques = () => {
  return (
    <>
      <Head>
        <title>Destaques - Foxtrot</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section className={[styles.sectionProducts, "section-products padding-y-sm"].join(' ')}>
        <div className="container">
          <header className={styles.headerProductsContainer}>
            <h2 className={styles.headerProductTitle}>Em destaque</h2>
          </header>
          <div className="row">
            {productsData.products.map((product) => (
              <div key={product.slug} className="col-md-3 mb-4">
                  <div className={["card", styles.cardProductGrid].join(' ')}>
                    <a href={`/produto/${product.slug}`} className={styles.imgWrap}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={220}
                        height={220}
                      />
                    </a>
                    <figcaption className={styles.infoWrap}>
                      <a href={`/produto/${product.slug}`} className={styles.titleProduct}>
                        {product.title}
                      </a>
                      <div className={[styles.priceProduct, "mt-1"].join(' ')}>{formatPrice(product.price)}</div>
                    </figcaption>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Destaques;