import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
const API_KEY_YOUTUBE='AIzaSyDd3M54VIc4_MJrp33au2Bfg6nJYB8F4UA';


class App extends Component {
    constructor(props){
        super(props);
        this.state={ 
            videos:[],
            selectedVideo:null
         };
        
         this.videoSearch('Yuvraj best shots');
    }
    videoSearch(term){
        YTSearch({key:API_KEY_YOUTUBE,term:term},(videos)=>{
            this.setState({ 
                videos:videos,
                selectedVideo:videos[0]
                });
                //console.log(videos[0]);
            //Means when ever key and values has same name ,we can right the code like above            
            //The above line equal to this.setState({videos:videos});
        });
    }

    
    render(){
        const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo } />
                <VideoList 
               onVideoSelect={selectedVideo=>this.setState({selectedVideo})} 
                           videos={this.state.videos} />
                
            </div>
        );
    }
}

ReactDOM.render(<App />,document.querySelector('.container'));