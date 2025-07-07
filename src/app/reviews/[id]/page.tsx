const Reviews = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>상품 번호 {id}에 관한 리뷰</div>;
};

export default Reviews;
