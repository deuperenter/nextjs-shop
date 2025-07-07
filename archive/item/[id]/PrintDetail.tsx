import Image from "next/image";
import Link from "next/link";

const PrintDetail = ({
  pImgs,
  pVideo,
  pVideoThumb,
  pName,
  seller,
  ratingScore,
  pId,
  totalRating,
  rating,
}: {
  pImgs: string[];
  pVideo: string[] | undefined;
  pVideoThumb: string[] | undefined;
  pName: string;
  seller: string;
  ratingScore: number;
  pId: string;
  totalRating: number;
  rating: { [k: string | number]: number };
}) => {
  const pMedia = [[...pImgs]];

  if (pVideo && pVideoThumb) {
    pMedia.push([...pVideo], [...pVideoThumb]);
  }

  return (
    <div>
      <Image src={pImgs[0]} alt="상품 이미지1" width={250} height={250} />
      {pVideo && (
        <video width={250} height={250} controls preload="none">
          <source src={pVideo[1][0]} type="video/mp4" />
        </video>
      )}
      <p className="font24">{pName}</p>
      <p>
        <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
      </p>
      <span>
        {ratingScore}&nbsp;&nbsp;&nbsp;
        <Link href={`/reviews/${pId}`}>{totalRating}개의 리뷰</Link>
      </span>
      <p>5점: {rating[5]}</p>
      <p>4점: {rating[4]}</p>
      <p>3점: {rating[3]}</p>
      <p>2점: {rating[2]}</p>
      <p>1점: {rating[1]}</p>
    </div>
  );
};

export default PrintDetail;
