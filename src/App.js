import React, { Component } from 'react';
import TOC from "./components/TOC"
import Content from "./components/Content"
import Subject from "./components/Subject"
import Control from "./components/Control"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Board from "./components/Board"
import ReaderBoard from './components/ReaderBoard';
import './App.css';




class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state ={
      mode:'welcome',
      selected_content_id:2,
      subject:{title:"Home",sub:"Firstpenguin!"},
      welcome:{title:'welcome',desc:'hello react!'},
      contents:[
        {id:1, title:"insung", desc:"HTML is for information"},
        {id:2, title:"yuna", desc:"CSS is for design"},
        {id:3, title:"eunseo", desc:"JavaScript is for interactive"}
      ],
      Free_board:[
        {id:1, title:'test',desc:'이글은 테스트 글입니다.'}
      ]
    }
  }
  getReadContent(){

    var i = 0;
    while (i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i=i+1;
  }
}
  getContent(){
    var _title, _desc, _article, _board_title, _board_desc= null;
    if (this.state.mode==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    }
    else if(this.state.mode==='read'){
      var _content=this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } 
    else if(this.state.mode==='create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id +=1;
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});

        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
        
        console.log(_title,_desc)
      }.bind(this)}></CreateContent>
    }  
    else if(this.state.mode==='update'){
      _content= this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id,_title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0 ;
        while( i<_contents.length){
          if(_contents[i].id===_id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i +=1;
        }
        
        this.setState({
          contents:_contents,
          mode:'read'
        });
        
        console.log(_title,_desc)
      }.bind(this)}></UpdateContent>
    }
    else if (this.state.mode==='readboard'){
      var j,i = 0;
      while (j<this.state.Free_board.length){
        var board_data = this.state.Free_board[i];
        if(board_data.id === this.state.selected_board_id){
          _board_title= board_data.title;
          _board_desc = board_data.desc;
          break;
        }
      }
    }    
    return _article ;
  }

  render() {
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({
            mode:'welcome'
          });
        }.bind(this)}
        >
        </Subject>
        {/* <Subject title="React" sub="For UI"></Subject> */}

        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode ==='delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i<_contents.length){
                if(_contents[i].id===this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i=i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('Delete!');
            }
          }
          this.setState({
            mode:_mode
          })

        }.bind(this)}></Control>
        {this.getContent()}
        {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}
        {/* <CreateContent title={_title} desc={_desc}></CreateContent> */}
        <Content title="REAL?"desc="TOC도 구현해보자"></Content>
        <Board onChangePage={function(id){
          this.setState({
            mode:'readboard',
            selected_board_id:Number(id)
          });
        }.bind(this)} data={this.state.Free_board}></Board>

        <ReaderBoard title='일단대기해' desc='시발럼아'></ReaderBoard>
      </div>
    );
  }
}




export default App;
