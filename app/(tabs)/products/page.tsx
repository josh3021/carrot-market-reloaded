import ListProduct from "@/components/list-product";
import db from "@/lib/db";

async function getProducts() {
  return db.product.findMany({
    select: {
      title: true,
      price: true,
      createdAt: true,
      photo: true,
      id: true,
    },
  });
}

export default async function Products() {
  const products = await getProducts();
  return (
    <div>
      {products.map((product) => (
        <ListProduct {...product} key={product.id} />
      ))}
    </div>
  );
}
