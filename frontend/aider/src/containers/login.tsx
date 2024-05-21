import "../styles/register.css"

export const Login = () =>{
    return <div className="login register">
        <form action="" className="pry-form">
        <h1>Login</h1>
        <div className="field-wrapper">
            <label htmlFor="email" >email <span className="danger" >*</span></label>
            <input type="text" name="email" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="password" >password <span className="danger" ></span></label>
            <input type="password" name="password" />
        </div>
        <button>Login</button>
        <p>not a member? <a href="register" >click to join community</a></p>
        </form>
    </div>
}