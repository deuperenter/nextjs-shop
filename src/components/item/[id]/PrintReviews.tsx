import { Reviews } from "@/types/receivedData";
import Image from "next/image";
import Link from "next/link";

const PrintReviews = ({ reviews, pId }: { reviews: Reviews; pId: string }) => {
  return reviews.content.map((c) => {
    const { rId, rText, rating, rImgs, rvideo } = c;
    return (
      <div key={rId}>
        <p>리뷰 보기</p>
        <div>{rating}</div>
        <div>{rText}</div>
        {rImgs?.map((img, i) => (
          <Image
            key={`rImage${i}`}
            alt={`reviewImg${i}`}
            src={img}
            width={250}
            height={250}
          />
        ))}
        {rvideo && (
          <video width={320} height={320} controls preload="none">
            <source src={rvideo[0]} type="video/mp4" />
          </video>
        )}
        <p>
          <Link href={`/reviews/${pId}`}>리뷰 더 보기</Link>
        </p>
      </div>
    );
  });
};

export default PrintReviews;
