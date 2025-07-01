"use client";

// 오작동을 할 때가 있다. 파일명을 변경했는데 import를 계속 소문자로 한다.
import Counter from "@/components/test/Counter";

// import { memo, useState } from "react";

const PostPage = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

// function Check({ props }) {
//   console.log(11);
//   return <div>{props}</div>;
// }

// // 외부로 분리를 해야한다.
// const Check = memo(function Check({ props }) {
//   console.log(11);
//   return <div>{props}</div>;
// });

export default PostPage;
