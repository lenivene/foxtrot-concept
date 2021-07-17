/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import Image from 'next/image';
import ErrorPage from 'next/error';
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from 'react';

// Types
// @ts-ignore-next-line
import { ProductType } from "@types/product";

import styles from "@styles/pages/product.module.scss";

// Utils
import { getCategoriesBySlug } from '@utils/getCategoriesBySlug';
import { getProductBySlug } from "@utils/getProductBySlug";
import { formatPrice } from '@utils/formatPrice';
import { FaCartPlus } from 'react-icons/fa';

// Hooks
import { useProduct } from '@hooks/useProduct';

type Props = {
  product: ProductType
}

const Product = ({ product }: Props) => {
  const router = useRouter();

  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  if(router.isFallback){
    return 'Carregando...';
  }

  // states
  const [thumbnail, setThumbnail] = useState(product.thumbnail);
  const { addProductToCart } = useProduct();

  const categories = getCategoriesBySlug(product.slug);

  const handleAddToCart = () => {
    addProductToCart(product);
  }

  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb" className="mt-2">
          <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
            {categories.map((category) => (
              <li
                key={`${category.id}-${category.slug}`}
                itemScope
                itemProp="itemListElement"
                className="breadcrumb-item"
                itemType="https://schema.org/ListItem"
              >
                <Link href={`/categoria/${category.id}`}>
                  <a itemProp="item">
                    <span itemProp="name">
                      {category.name}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-4 pb-4">
            <div className="d-flex w-100 align-items-center justify-content-center">
              <Image
                src={thumbnail}
                alt={product.title}
                width={220}
                height={220}
              />
            </div>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-space-between">
            <div>
              <h1 className={styles.productTitle}>{product.title}</h1>
              <div className={[styles.priceProduct, 'text-muted'].join(' ')}>
                {formatPrice(product.price)}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-end flex-fill mt-2">
              <div className="row">
                <div className="col-md">
                  <button
                    className="btn btn-success"
                    onClick={handleAddToCart}
                  >
                    <span className="pr-1">
                      <FaCartPlus size="1.2rem" />
                    </span>
                      Add ao carrinho
                  </button>
                </div>
                <div className="col-md flex-column text-md-center">
                  <strong className="text-primary">
                    Super Bônus
                  </strong>
                  <p>Nesta compra você ganha {Number.parseInt(String(Math.round(product.price)))} bônus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={[styles.productInfo, 'border-top'].join(' ')}>
          <h2>Informações do produto</h2>
          <div className="description mb-3">
            {product.description}
          </div>
          {product.technicalInformation && (
            <>
              <h2>Informações Técnicas</h2>
              <div className="description">
                <ul>
                  {product.technicalInformation.map((technicalInformation, index) => (
                    <li key={index}>{technicalInformation}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }: any) => {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: { product },
    revalidate: 1,
  }
}

export const getStaticPaths = () => {
  const products = [getProductBySlug('correia-para-instrumento-basso-bordadas-vt-l-exercito')];

  return {
    paths: products.map(product => {
      if(product.slug){
        return { params: { slug: product.slug } }
      }
    }),
    fallback: true,
  }
}

export default Product;