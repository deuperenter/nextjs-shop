const Category = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <div>
      <div>
        카테고리 페이지. 큰 카테고리는 작은 카테고리 선택하는 페이지. 작은
        카테고리는 상품의 목록을 보여준다.
      </div>
      현재 카테고리: {category}
    </div>
  );
};

export default Category;
