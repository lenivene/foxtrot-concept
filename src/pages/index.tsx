import Link from 'next/link';
import Image from 'next/image';
import Glide from '@glidejs/glide';
import { useRef, useEffect } from 'react';

// Icons
import { FaDollarSign, FaTruck } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";


// Styles
import styles from "@styles/pages/home.module.scss";

// Data
import productsData from "@mock/data.json";

// Utils
import { formatPrice } from '@utils/formatPrice';

export default function Home() {
  const slider = useRef();

  useEffect(() => {
    new Glide(slider.current, {
      autoplay: 5000
    }).mount()
  }, []);

  return (
    <>
      <section className={styles.sectionIntro}>
        <div className="container">
          <div ref={slider} className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide">
                  <Image
                    src="/slider/1-hd.jpg"
                    className="img-fluid rounded"
                    width={1280}
                    height={280}
                  />
                </li>
                <li className="glide__slide">
                  <Image
                    src="/slider/2-hd.jpg"
                    className="img-fluid rounded"
                    width={1280}
                    height={280}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={[styles.sectionSpecials, "pt-1 pb-3 border-bottom"].join(' ')}>
        <div className="container">	
          <div className="row">
            <div className="col-md-4">	
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-primary">
                      <IoLogoWhatsapp />
                    </span>
                  </div>
                  <figcaption className="info">
                    <strong className="title">Atendimento</strong>
                    <p className="text-muted">
                      Para facilitar sua comunica????o connosco ??tilizamos o
                      <a
                        className="px-1"
                        href="https://api.whatsapp.com/send?phone=5571997110443"
                      >WhatsApp</a>
                    </p>
                  </figcaption>
                </figure>
            </div>
            <div className="col-md-4">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-danger">
                      <FaDollarSign />
                    </span>
                  </div>
                  <figcaption className="info">
                    <strong className="title">Exclusividade Foxtrot</strong>
                    <p className="text-muted">
                    Ao adquirir nossos produtos, creditamos parte do seu pagamento em b??nus
                    </p>
                  </figcaption>
                </figure>
            </div>
            <div className="col-md-4">
                <figure className="itemside">
                  <div className="aside">
                    <span className="icon-sm rounded-circle bg-success">
                      <FaTruck />
                    </span>
                  </div>
                  <figcaption className="info">
                    <strong className="title">Frete gr??tis</strong>
                    <p className="text-muted">
                      Para compras acima de R$ 899,99 o frete ?? gr??tis; <a href="#">clique aqui</a> e saiba mais.
                    </p>
                  </figcaption>
                </figure> 
            </div>
          </div>
        </div>
      </section>

      <section className={[styles.sectionProducts, "section-products padding-y-sm"].join(' ')}>
        <div className="container">
          <header className={styles.headerProductsContainer}>
            <h2 className={styles.headerProductTitle}>Em destaque</h2>
            <div>
              <Link href="/destaques">
                <a className="btn btn-outline-primary float-right">
                  Ver todos
                </a>
              </Link>
            </div>
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
