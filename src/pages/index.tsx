import { useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Glide from '@glidejs/glide';

// Icons
import { FaCcMastercard, FaCcVisa, FaDollarSign, FaTruck } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";

import { Header } from '@components/Header';
import styles from "@styles/pages/home.module.scss";

// Data
import productsData from "@mock/data.json";
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
      <Head>
        <title>Foxtrot Instrumentos Musicais - Quem gosta de música passa por aqui!</title>
      </Head>
      <Header />
      <section className={styles.sectionIntro}>
        <div className="container">
          <div ref={slider} className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide">
                  <Image
                    src="/slider/1-hd.jpg"
                    width={1280}
                    height={280}
                  />
                </li>
                <li className="glide__slide">
                  <Image
                    src="/slider/2-hd.jpg"
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
                      Para facilitar sua comunicação connosco útilizamos o
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
                    Ao adquirir nossos produtos, creditamos parte do seu pagamento em bônus
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
                    <strong className="title">Frete grátis</strong>
                    <p className="text-muted">
                      Para compras acima de R$ 899,99 o frete é grátis; <a href="#">clique aqui</a> e saiba mais.
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
              <a href="#" className="btn btn-outline-primary float-right">Ver todos</a>
            </div>
          </header>
          <div className="row">
            {productsData.map((product) => (
              <div key={product.slug} className="col-md-3 mb-4">
                  <div className={["card", styles.cardProductGrid].join(' ')}>
                    <a href="#" className={styles.imgWrap}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={220}
                        height={220}
                      />
                    </a>
                    <figcaption className={styles.infoWrap}>
                      <a href="#" className={styles.titleProduct}>
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
      <footer>
        <div className="container">
        <section className="border-top pt-3 row">
          <div className="col-md-2">
            <p className="text-muted">&copy; {new Date().getFullYear()} Foxtrot</p>
          </div>
          <div className="col-md-8 text-md-center">
            <span className="px-2">televendas@foxtrot.com.br</span>
            <span className="px-2">71 3616-7777</span>
          </div>
          <div className="col-md-2 d-md-flex justify-content-md-end text-muted">
            <span className="px-1"><FaCcVisa size={24} /></span>
            <span className="px-1"><FaCcMastercard size={24} /></span>
          </div>
        </section>
        </div>
      </footer>
    </>
  )
}
