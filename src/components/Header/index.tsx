/* eslint-disable @next/next/no-img-element */
import React, {
  useCallback,
  useEffect,
  useRef
} from 'react';
import { Link } from '@components/Link';

// Icons
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import styles from "./style.module.scss";

// Hooks
import { useProduct } from '@hooks/useProduct';

// Utils
import { getCategories } from '@utils/getCategories';

export const Header: React.FC = () => {
  const menuDropdownRef = useRef<HTMLLIElement>(null);
  const menuWrapperRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const product = useProduct();
  const categories = getCategories();
  
  const toggleDropdown = useCallback(() => {
    const dropdown = menuDropdownRef.current.querySelector(".dropdown-menu");

    const globalEventListen = () => {
      toggleDropdown();
      menuDropdownRef.current.removeEventListener('click', globalEventListen);
    }

    dropdown.classList.toggle('show');
    menuDropdownRef.current.classList.toggle('show');

    setTimeout(() => {
      window.addEventListener('click', globalEventListen);
    }, 200);
  }, []);

  const handleHamburgerMenu = () => {
    menuRef.current.classList.toggle('d-block');
    menuWrapperRef.current.classList.toggle('d-none');
  }

  useEffect(() => {
    menuDropdownRef.current.addEventListener('click', toggleDropdown);

    return () => {
      window.removeEventListener('click', toggleDropdown);
    }
  }, [toggleDropdown]);

  return (
    <>
      <header className="section-header">
        <section className={[styles.headerMain, "header-main", "border-bottom"].join(' ')}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-4 col-6">
                <Link href="/">
                  <a
                    className="brand-wrap"
                  >
                    <img
                      className="logo"
                      src="/logo.svg"
                      alt="a"
                    />
                  </a>
                </Link>
              </div>
              <div className={styles.searchContainer}>
                <form action="#">
                  <div className="input-group w-100">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Procurar..."
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <FaSearch />
                        </button>
                      </div>
                    </div>
                </form>
              </div>
              <div className="col-lg-2 col-md-4 col-6 d-flex justify-content-end">
                <div className="widgets-wrap">
                  <div className={[styles.widgetHeader, styles.icontext].join(' ')}>
                    <a href="#" className={[styles.icon, "icon-sm rounded-circle border"].join(' ')}>
                      <FaUser
                        size="20px"
                      />
                    </a>
                  </div>
                  <div className={[styles.widgetHeader, "mr-3"].join(' ')}>
                    <Link href="/carrinho">
                      <a className="icon icon-sm rounded-circle border">
                        <FaShoppingCart />
                      </a>
                    </Link>
                    <span
                      className={[styles.widgetCountNotify, "badge rounded-circle bg-warning"].join(' ')}
                    >
                      {product.totalInCart()}
                    </span>
                  </div>
                  <div className={[styles.widgetHeader, "mr-3", "d-inline-block", "d-lg-none"].join(' ')}>
                    <button
                      onClick={handleHamburgerMenu}
                      className="shadow-none bg-transparent navbar-toggler"
                      type="button"
                    >
                      <GiHamburgerMenu />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <nav
        className="navbar navbar-main navbar-expand-lg navbar-light bg-primary d-none d-md-block"
        ref={menuWrapperRef}
      >
        <div className="container">
          <div className="collapse navbar-collapse" ref={menuRef}>
            <ul className="navbar-nav text-white">
              <li className="nav-item dropdown" ref={menuDropdownRef}>
                <span
                  className="nav-link pl-0"
                >
                  <strong><FaBars />&nbsp;Todos os setores</strong>
                </span>
                <div className="dropdown-menu text-primary">
                  {categories.map((category) => (
                    <Link key={category.id} href={`/categoria/${category.id}`}>
                      <a className="dropdown-item">
                        {category.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </li>
              <li className="nav-item">
                <Link
                  href="/"
                >
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contrabaixo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Guitarra Violão</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Teclado Piano</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Bateria Percussão</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Infantil</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}