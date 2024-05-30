import { HomeProps } from "./types/props/homeProps";
import MapDemo from "../assets/img/map-demo.png"
import {Icon} from "@iconify/react"

import "../styles/home.css"
import { stories } from "../assets/data/stories";
import { StoryCard } from "../components/story-card";

const Home = (props: HomeProps)=>{
    return <div className="home">
            <section className="write-up1" >
                <h2>Be the hero your neighbourhood needs.</h2>
                <p>Empowering communities, one volunteer at a time to bridge the gap in emergency response</p>
                <button onClick={()=>{window.location.assign("/register")}} className="cta pry-color" >Join Community</button>
            </section>
            <img src={MapDemo} alt="" />
            <section className="section-2" >
                <h4>Save a life today, report an <span className="danger">emergency</span>.</h4>
                <button className="cta pry-color-light">report emergency</button>
            </section>

            <section className="section-3">
                <h4>We appreciate our volunteers</h4>
                <div className="custom-icn">
                    <hr/><Icon className="icn" icon="flat-color-icons:like" /><hr/>
                </div>
            </section>
            <section className="section-4">
                <div className="list-wrapper">
                    <div className="story-card-list">
                        {stories.map(story=><StoryCard story={story} />)}
                    </div>
                </div>
                <form action="" className="story-form">
                    <h4>share your story with us</h4>
                    <textarea rows={4} ></textarea>
                    <button className="cta" >share story</button>
                </form>
            </section>
    </div>
}

export { Home }