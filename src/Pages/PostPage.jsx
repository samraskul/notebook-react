import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import PageTextEditor from "../components/PostPageComponents/PageTextEditor";
import { get } from "../api/backend";
import { post } from "../api/backend";
import CodeEditor from "../components/Editor/CodeEditor";
import AddEditorButtons from "../components/PostPageComponents/AddEditorButtons";
import Loading from "../components/PostPageComponents/Loading";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {Notification} from '../components/Notification/Notification';
import "./PostPage.css";

const PostPage = (props) => {
  const params = useParams();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [activePostIdsHistory, setActivePostIdsHistory] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [shareButtonText, setShareButtonText] = useState('Share');

  // console.log('1-activePostIdsHistory' , activePostIdsHistory);
  // console.log('2-props.adminActiveMenuId' , props.adminActiveMenu);

  if (
    activePostIdsHistory !== props.adminActiveMenu.id &&
    props.adminActiveMenu.link !== null
  ) {
    setLoading(true);

    get("/posts/" + params.id.toString() + location.search).then((data) => {
      data = data.data.data;
      console.log("axios get method data", data);
      setPosts(data);
      // setjj(props.adminActiveMenuId);
      // console.log("props.adminActiveMenuId", props.adminActiveMenuId);
      // console.log("activePostIdsHistory", activePostIdsHistory);

      setLoading(false);
    });
    setActivePostIdsHistory(props.adminActiveMenu.id);
  }
  //   get("/posts/" + params.id.toString()).then((data) => {
  //     data = data.data.data;
  //     console.log("axios get method data", data);
  //     setPosts(data);
  //     // setjj(props.adminActiveMenuId);
  //   });
  //   console.log("post page loaded");

  const saveHandler = () => {
    console.log("save started");
    
    let tmpPosts = [];
    posts.forEach((item, index) => {
      if (item.content && item.content.length > 0) {
        item.id = index;
        tmpPosts.push(item);
      }
    });
    
    post("/posts/" + params.id.toString() , {
      data: tmpPosts
    }).then((data) => {
      // console.log("axios post method data", data);
      setPosts(data.data.data);
      console.log("saved successfully");
    });
  };

  const EditorChangeHandler = (index, content) => {
    let tmpPosts = [...posts];

    if (tmpPosts[index].hasOwnProperty("content")) {
      tmpPosts[index].content = content;
      setPosts([...tmpPosts]);
    }
  };

  const addEditorHandler = (
    codeOrTextContent,
    orderId = 1000,
    code_programming_language = "java script"
  ) => {
    // console.log("editor added");

    // start ++++++ calculate date
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, "0");
    let mm = String(now.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = now.getFullYear();
    let h = now.getHours().toString();
    if (h.length === 1) {
      h = "0" + h;
    }
    let m = now.getMinutes().toString();
    if (m.length === 1) {
      m = "0" + m;
    }
    let s = now.getSeconds().toString();
    if (s.length === 1) {
      s = "0" + s;
    }
    now = yyyy + "-" + mm + "-" + dd + "T" + h + ":" + m + ":" + s;
    // end -------- calculate date

    let tmpPosts = [...posts];
    let firstHalfPosts = tmpPosts.slice(posts, orderId);
    // console.log("firstHalfPosts", firstHalfPosts);
    let secondHalfPosts = tmpPosts.slice(orderId);
    // console.log("secondHalfPosts", secondHalfPosts);

    // maybe we should add id+1 for all the secondHalfPosts
    setPosts([
      ...firstHalfPosts,
      {
        id: orderId,
        content: "",
        link: params.id.toString(),
        order: 0,
        type: codeOrTextContent.toString("html"), //or code // get it from input of this function
        code_programming_language: code_programming_language,
        created_at: now,
        updated_at: now
      },
      ...secondHalfPosts
    ]);

    // setPosts([
    //   ...posts,
    //   {
    //     id: posts.length + 1,
    //     content: "",
    //     link: params.id.toString(),
    //     order: 0,
    //     type: codeOrTextContent.toString("html"), //or code // get it from input of this function
    //     code_programming_language: code_programming_language,
    //     created_at: now,
    //     updated_at: now
    //   }
    // ]);
  };

  const sharePageHandler = ()=>{
    let fullURL = window.location.href;
    let domain = fullURL.slice(0, fullURL.indexOf('/', 8));
    if(location.search.length > 1){
      // this is another public page
      // we should not add location.search
      navigator.clipboard.writeText(fullURL);
    }else{
      // this is my page
      // we have to add location.search
      navigator.clipboard.writeText(domain + location.pathname + '?user=' + localStorage.getItem('userId'));
    }
    setShareButtonText('Copied!');
    Notification("This page's link, is copied into your clipboard.");
    setTimeout(()=>{
      setShareButtonText('Share');
    }, 3000)
  };

  return (
    <div className="post-page-container">
      {loading ? <Loading /> : null}
      <div className="post-page-container-texts">
        <div>
          <div>
            {posts.map((post, index) => {
              if (post.type === "text") {
                return (
                  <div key={index}>
                    <AddEditorButtons
                      addEditorHandler={addEditorHandler}
                      saveHandler={saveHandler}
                      index={index}
                    />

                    {/* <TextEditor
                      onChange={EditorChangeHandler}
                      index={index}
                      id={post.id}
                      content={post.content}
                      key={index}
                    /> */}

                    <PageTextEditor
                      onChange={EditorChangeHandler}
                      index={index}
                      id={post.id}
                      content={post.content}
                      key={index}
                    />
                  </div>
                );
              }
              return (
                <div key={index}>
                  <AddEditorButtons
                    addEditorHandler={addEditorHandler}
                    saveHandler={saveHandler}
                    index={index}
                  />

                  <CodeEditor
                    index={index}
                    onChange={EditorChangeHandler}
                    id={post.id}
                    content={post.content}
                    key={index}
                  />
                </div>
              );
            })}
          </div>

          {/* <div>
        <button
          onClick={() => {
            addEditorHandler("text");
          }}
        >
          Add TextEditor
        </button>
        <button
          onClick={() => {
            addEditorHandler("code");
          }}
        >
          Add CodeEditor
        </button>
        <button onClick={saveHandler}>Save</button>
      </div> */}

          <AddEditorButtons
            addEditorHandler={addEditorHandler}
            saveHandler={saveHandler}
            index={100000}
            key={100000}
          />

          {/* <button onClick={saveHandler} className="save-button" style={{position:"static", button:"10px", right:"10px",padding:"30px", zIndex:"2", backgroundColor:"rgba(139,195,74, 1)", cursor:"pointer", margin:"20px"}}>Save</button> */}
          {/* <button onClick={saveHandler} className="button">Save</button> */}
          <Stack direction="row" style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={saveHandler}
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            {localStorage.getItem('userType') === "public" ? <Button variant="contained" endIcon={<SendIcon />} onClick={sharePageHandler}>{shareButtonText}</Button> : null}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
