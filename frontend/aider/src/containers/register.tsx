
import "../styles/register.css"
import "../styles/report.css"

export const Register = () =>{
    const categoryOptions = [
        {title: "professional doctor, emt, nurse,...", value: "professional"},
        {title: "I received a formal training (through university, college, scholl of nurses...)", value: "formal"},
        {title: "I received an informal training, (apprenticeship, community service...)", value: "informal"},
        {title: "I ave no medical training experience", value: "none"}

    ]
 return <div className="register">
    <form action="" className="pry-form">
        <h1>Join our community</h1>
        <div className="field-wrapper">
            <label htmlFor="firstName" >First name <span className="danger" >*</span></label>
            <input type="text" name="firstName" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="lastName" >Last name <span className="danger" >*</span></label>
            <input type="text" name="lastName" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="email" >email <span className="danger" >*</span></label>
            <input type="text" name="email" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="category" >do you have any medical training experience? <span className="danger" >*</span></label>
            <select>
            {categoryOptions.map((opt, i)=><option title={opt.title} value={opt.value} key={i} >{opt.title}</option>)}
            </select>
        </div>
        <div className="field-wrapper">
            <label htmlFor="password" >Password <span className="danger" >*</span></label>
            <input type="password" name="password" />
        </div>
        <div className="field-wrapper">
            <label htmlFor="confirmPassword" >confirm password <span className="danger" >*</span></label>
            <input type="password" name="confirmPassword" />
        </div>
        <button className="btn-pry" >Join community</button>
        <p>already a member? <a href="/login" >login here</a></p>
    </form>
 </div>   
}