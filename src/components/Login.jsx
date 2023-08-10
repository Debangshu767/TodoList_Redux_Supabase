import { supabase } from "../supabaseClient";
import { object, string } from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate()
  
    let userSchema = object({
      email: string()
        .email()
        .typeError("not a valid email format")
        .required("Email is required"),
      password: string()
        .required()
        .min(8, "Password must be at least 8 characters long"),
    });
  
    const handlecustomSubmit = async (values) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
          
        })
        console.log(data,error)
      } catch (error) {
        console.error("Error during login", error); // Debugging log
      }
      navigate('/home')
    };
  
    return (
      <>
        <div className="flex flex-col gap-4 items-center m-auto">
          <h1 className="text-2xl text-blue-400  font-black p-2 rounded-lg m-2">
            Login
          </h1>
  
          <Formik
            initialValues={{email: "", password: "" }}
            validationSchema={userSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true); // Indicate that submission is in progress
              await handlecustomSubmit(values);
              setSubmitting(false); // Reset submission status
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className="flex flex-col gap-4 items-center m-auto w-full max-w-[500px]">
                <div className="w-full max-w-[500px]">
                  <h2 className="text-lg text-blue-300">Email</h2>
                  <input
                    className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
                    type="text"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-600">{errors.email}</div>
                  )}
                </div>
  
                <div className="w-full max-w-[500px]">
                  <h2 className="text-lg text-blue-300">Password</h2>
                  <input
                    className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-[500px] "
                    type="text"
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-600">{errors.password}</div>
                  )}
                </div>
                <div className='flex flex-row gap-4 items-center'>
            <p>Dont Have an account?</p>
            <Link to={"/Login"}  className="font-bold text-blue-400">Signup</Link>
          </div>
                <button className="bg-blue-300 uppercase p-2 rounded-lg text-white hover:bg-blue-400 w-[100px]" type="submit" onClick={handleSubmit}>Login</button>
              </form>
            )}
          </Formik>
        </div>
      </>
  );
}

export default Login;
