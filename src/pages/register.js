import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showloading());
      const response = await axios.post("api/user/register", values);
      dispatch(hideloading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast.success("Redirigiendo al Login");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      toast.error("Algo mal ha pasado :(");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="p-4 bg-light shadow rounded"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Registro</h2>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Introduzca su Nombre" }]}
          >
            <Input size="large" placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "Introduzca su Codigo" }]}
          >
            <Input size="large" placeholder="Codigo Universitario" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Introduzca un Correo valido",
              },
            ]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Introduzca su Contraseña" }]}
          >
            <Input.Password size="large" placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Registrar
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-3">
          ¿Ya tienes una cuenta? <br />
          <a href="/login" className="text-primary">
            {" "}
            Ingrese{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
