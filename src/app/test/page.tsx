"use client";

import { memo, useState } from "react";

const PostPage = () => {
  const stock = 111;
  const [content, setContent] = useState("");

  return (
    <div>
      <h1>Post Data</h1>
      <input
        type="text"
        onChange={(e) => setContent(e.target.value)}
        placeholder="type it!"
      />
      <Check props={11} />
      <Check props={stock} />
      {/* 얘는 props가 바뀌면 내용도 바뀐다. */}
      {/* <Check props={content} /> */}
    </div>
  );
};

// function Check({ props }) {
//   console.log(11);
//   return <div>{props}</div>;
// }

// 외부로 분리를 해야한다.
const Check = memo(function Check({ props }) {
  console.log(11);
  return <div>{props}</div>;
});

export default PostPage;
