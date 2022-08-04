import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import LoaderImg from '../../images/loader.gif';

export const GetImagesData = () => {
  const [imageData, setImageData] = useState({});
  const [name, setName] = useState("");
  const [list, setList] = useState(0);
  const [loader,setLoader] = useState(false);

  return (
    <>
      <div className="main_heading">
        <h1>Get Details of Your Favourite</h1>
      </div>

     {
        loader && (
            <div>
                <img src={LoaderImg} />
            </div>
        )
     }

      <form
        onSubmit={(e) => {
            
          e.preventDefault();
          setLoader(true)

          axios({
            method: "GET",
            url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
            params: {
              q: name,
              pageNumber: "1",
              pageSize: list,
              autoCorrect: "true",
            },
            headers: {
              "X-RapidAPI-Key":
                "656ee00fdbmsh430e210ae0d23abp1d99a4jsnde530b921154",
              "X-RapidAPI-Host":
                "contextualwebsearch-websearch-v1.p.rapidapi.com",
            },
          })
            .then((res) => {
              console.log(res.data, "response in API");
              setLoader(false)
              setImageData(res.data);
              console.log(imageData, "how ");
            })
            .catch((err) => {
              console.log(err, "Error occur in API");
            });
        }}
      >
        <div className="singer_details">
          <input
            type="text"
            placeholder="Enter Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="How many List you want..."
            onChange={(e) => setList(e.target.value)}
          />

          <button type="submit">Search</button>
        </div>
      </form>

      <div className="getAllDetails">
        <div className="container">
          <div className="row">
            {imageData?.value?.map((data, key) => {
              return (
                <div key={key}>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="parent_div">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="parent_images_section">
                        <img
                        //   height={data.height}
                        // width={data.width}
                          className="img-fluid firstImg"
                          src={data.url}
                        />
                        <img className="img-fluid secondImg" height={data.thumbnailHeight} width={data.thumbnailWidth} src={data.thumbnail} />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">

                        <div className="parent_content_section">

                        <span className="align_content">
                          {" "}
                          <label>Title:</label> <p> {data.title}</p>{" "}
                        </span>
                        <span className="align_content">
                          {" "}
                          <label>
                            Reference:</label> <h6>{data.provider.name}</h6>{" "}
                          {" "}
                        </span>
                        <span className="align_content">
                          {" "}
                          <label>
                            Ref Link:</label> <a className="btn_link" href= {data.webpageUrl}>Click me</a>{" "}
                          {" "}
                        </span>
                        <span className="align_content">
                          {" "}
                          <label>
                            More Images:</label> <a className="btn_link" href= {data.imageWebSearchUrl}>More Images</a>{" "}
                          {" "}
                        </span>
                        </div>
                      </div>
                    </div>       
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>



    </>
  );
};
