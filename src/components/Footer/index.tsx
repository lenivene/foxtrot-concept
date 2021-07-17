import React from 'react';

import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="border-top mt-3">
      <div className="container">
        <section className="pt-3 row">
          <div className="col-md-2 order-2 order-md-0 d-flex justify-content-center justify-content-md-start text-muted">
            <p className="text-muted">&copy; {new Date().getFullYear()} Foxtrot</p>
          </div>
          <div className="col-md-8 order-1 order-md-0 text-md-center d-flex justify-content-center text-muted">
            <span className="px-2">televendas@foxtrot.com.br</span>
            <span className="px-2">71 3616-7777</span>
          </div>
          <div className="col-md-2 d-flex justify-content-center justify-content-md-end text-muted">
            <div>
              <span className="px-1"><FaCcVisa size={24} /></span>
              <span className="px-1"><FaCcMastercard size={24} /></span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}