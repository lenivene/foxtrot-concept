import React, { useCallback } from "react";
import { useProduct } from "@hooks/useProduct";

const Login = () => {
  const product = useProduct();

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  
    alert("Olá, seu carrinho foi limpado ;)");

    product.resetCart();
  }, []);

  return (
    <section className="section-login padding-y">
      <div className="container">
        <div className="card mx-auto" style={{
          maxWidth: '500px'
        }}>
          <div className="card-body">
            <h4 className="card-title mb-4">Entrar</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group my-3">
                  <input
                    name="username"
                    className="form-control"
                    placeholder="Usuário"
                    type="text"
                  />
                </div>
                <div className="form-group my-3">
                  <input
                    name="password"
                    className="form-control"
                    placeholder="Senha"
                    type="password"
                  />
                </div>
                <div className="form-group my-3">
                    <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;