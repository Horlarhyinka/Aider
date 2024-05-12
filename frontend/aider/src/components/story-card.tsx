import { StoryProp } from "./types/storyProps";
import "../styles/story-card.css"


export const StoryCard = (prop: StoryProp) =>{
    return <div className="story-card">
        <h4>"{prop.story.name}"</h4>
        <p>{prop.story.content}</p>
        <div className="base">
            <img src={prop.story.image} alt={prop.story.name} />
        </div>
    </div>
}