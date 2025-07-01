const ShowStock = ({ stock }: { stock: number }) => {
  if (!stock) {
    return <p>재고 없음</p>;
  }
  const selection = [];
  for (let i = 1; i <= stock && i <= 30; i++) {
    selection.push(<option key={`stock${i}`}>{i}</option>);
  }
  return (
    <p>
      수량: <select id="stock">{selection}</select>
    </p>
  );
};

export default ShowStock;
