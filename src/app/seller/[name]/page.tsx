const Seller = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  return <div>판매자 {name}가 판매하는 상품들</div>;
};

export default Seller;
