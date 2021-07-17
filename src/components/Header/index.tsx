/* eslint-disable @next/next/no-img-element */
import React, {
  useCallback,
  useEffect,
  useRef
} from 'react';
import { Link } from '@utils/Link';

// Icons
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import styles from "./style.module.scss";

export const Header: React.FC = () => {
  const menuDropdownRef = useRef<HTMLLIElement>(null);

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

  useEffect(() => {
    menuDropdownRef.current.addEventListener('click', toggleDropdown);

    return () => {
      window.removeEventListener('click', toggleDropdown);
      menuDropdownRef.current.removeEventListener('click', toggleDropdown);
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
              <div className="col-lg-2 col-md-4 col-6">
                <div className="widgets-wrap float-md-right text-right">
                  <div className={[styles.widgetHeader, styles.icontext].join(' ')}>
                    <a href="#" className={[styles.icon, "icon-sm rounded-circle border"].join(' ')}>
                      <FaUser
                        size="20px"
                      />
                    </a>
                  </div>
                  <div className={[styles.widgetHeader, "mr-3"].join(' ')}>
                    <a href="#" className="icon icon-sm rounded-circle border">
                      <FaShoppingCart />
                    </a>
                    <span
                      className={[styles.widgetCountNotify, "badge rounded-circle bg-warning"].join(' ')}
                    >0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <nav className="navbar navbar-main navbar-expand-lg navbar-light bg-primary">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
      
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav text-white">
              <li className="nav-item dropdown" ref={menuDropdownRef}>
                <span
                  className="nav-link pl-0"
                >
                  <strong><FaBars />&nbsp;Todos os setores</strong>
                </span>
                <div className="dropdown-menu text-primary">
                  <a className="dropdown-item" href="#">Guitarra/Violão</a>
                  <a className="dropdown-item" href="#">Contrabaixo</a>
                  <a className="dropdown-item" href="#">Teclado/Piano</a>
                  <a className="dropdown-item" href="#">Bateria/Percussão</a>
                  <a className="dropdown-item" href="#">Pró Áudio</a>
                  <a className="dropdown-item" href="#">Orquestral</a>
                  <a className="dropdown-item" href="#">Pc/Software</a>
                  <a className="dropdown-item" href="#">Infantil</a>
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