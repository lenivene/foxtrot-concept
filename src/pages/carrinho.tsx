import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

// Icons
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { ImCrying } from 'react-icons/im';

// Hooks
import { useProduct } from '@hooks/useProduct';

// Utils
import { formatPrice } from '@utils/formatPrice';

const Cart = () => {
  const {
    cart,
    removeProductFromCart,
    sumTotalPrice
  } = useProduct();
  const router = useRouter();

  const currentTotalPrice = sumTotalPrice();
  const [discountPrice, setDiscountPrice] = useState(0);
  const [coupon, setCoupon] = useState('');

  const onChangeCoupon = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  }, []);

  const handleApplyDiscount = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setDiscountPrice(0);

    if(coupon.toLowerCase() == '5reais'){
      if(currentTotalPrice >= 5){
        setDiscountPrice(5);
      }
      else{
        alert("Não é possível aplicar o desconto de 5 reais!");
      }
    }
  }, [coupon, currentTotalPrice]);

  const handleGoToSignin = useCallback(() => {
    router.push('/login');
  }, []);

  if(cart.length <= 0){
    return (
      <div className="container pt-3">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <ImCrying
            size="3rem"
          />
        </div>
        <h2 className="d-flex flex-column align-items-center">
          Carrinho está vazio
        </h2>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Carrinho - Foxtrot</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table">
                  <thead className="text-muted">
                    <tr className="small text-uppercase py-1">
                      <th scope="col">Produto</th>
                      <th></th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((cartItem) => (
                      <tr key={cartItem.slug}>
                        <td>
                          <Link href={`/produto/${cartItem.slug}`}>
                            <a>
                              <Image
                                src={cartItem.thumbnail}
                                className="img-fluid rounded img-sm"
                                width={80}
                                height={80}
                              />
                            </a>
                          </Link>
                        </td>
                        <td>
                          <Link href={`/produto/${cartItem.slug}`}>
                            <a
                              className="title text-dark"
                            >
                              {cartItem.title}
                            </a>
                          </Link>
                        </td>
                        <td> 
                          <button
                            className="p-0 text-muted border-0 bg-transparent"
                            onClick={() => {
                              removeProductFromCart(cartItem.slug)
                            }}
                          >
                            {cartItem.quantity} <FaTrash className="ml-2" />
                          </button>
                        </td>
                        <td> 
                          <strong>{formatPrice(cartItem.price)}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card-body border-top d-flex justify-content-between">
                <Link href="/">
                  <a className="btn btn-light">
                    <FaChevronLeft /> Continue comprando
                  </a>
                </Link>
                <button
                  onClick={handleGoToSignin}
                  className="btn btn-primary float-md-right"
                >
                  Finalizar <FaChevronRight />
                </button>
              </div>	
            </div>
          </div>
          <aside className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
              <form onSubmit={handleApplyDiscount}>
                <div className="form-group">
                  <label>Você tem cupom?</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="5reais"
                      onChange={onChangeCoupon}
                      value={coupon}
                    />
                    <span className="input-group-append"> 
                      <button className="btn btn-primary" type="submit">Aplicar</button>
                    </span>
                  </div>
                </div>
              </form>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Valor total:</dt>
                    <dd className="text-right">{formatPrice(currentTotalPrice)}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Desconto:</dt>
                    <dd className="text-right">{formatPrice(discountPrice)}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right  h5"><strong>{formatPrice(currentTotalPrice-discountPrice)}</strong></dd>
                  </dl>          
              </div>
            </div> 
          </aside>
        </div>
      </div>
    </>
  )
}

export default Cart;