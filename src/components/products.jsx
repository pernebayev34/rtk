import { useEffect } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../api/apislice";
import { toast } from "react-toastify";

const Products = () => {
  const { isLoading, isError, error, isSuccess, data } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [
    deleteProduct,
    { isSuccess: isDeleted, isError: isDeleteError, error: deleteError },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (isDeleted) toast.success("Successfully");
    if (isDeleteError)
      toast.error(
        ` error : ${deleteError.message}`,
      );
  }, [isDeleted, isDeleteError, deleteError]);

  const handleAdd = async () => {
    const title = window.prompt("Title");
    if (!title) return;

    const price = window.prompt("Price");
    if (!price) return;

    const category = window.prompt("Category");
    if (!category) return;

    try {
      await addProduct({
        title,
        price: Number(price),
        category,
      }).unwrap();
      toast.success("Successfully ");
    } catch (err) {
      toast.error(` error ${err.message}`);
    }
  };

  const handleEdit = async (item) => {
    const title = window.prompt("Title", item?.title);
    if (title === null) return;

    const price = window.prompt("Price", item?.price);
    if (price === null) return;

    const category = window.prompt("Category", item?.category);
    if (category === null) return;

    try {
      await editProduct({
        ...item,
        title,
        price: Number(price),
        category,
      }).unwrap();
      toast.success("Successfully");
    } catch (err) {
      toast.error(`error ${err.message}`);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error}</h1>;
  if (isSuccess)
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">Products</h1>
          <button onClick={handleAdd} className="border p-2">
            Add
          </button>
        </div>
        {data?.map((item) => (
          <div
            className="flex justify-between items-center gap-2 border p-2 my-2"
            key={item?.id}
          >
            <div className="flex items-center gap-2">
              <img src={`${item?.image}`} alt={item?.title} width={"30px"} />
              <h2>
                {item?.title?.length > 50
                  ? item?.title.substring(0, 49) + "..."
                  : item?.title}
              </h2>
            </div>
            <p>{item?.category}</p>
            <p>{item?.price}$</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="border p-2">
                Edit
              </button>
              <button
                onClick={async () => {
                  if (
                    window.confirm(
                      "aniq ochirmoqchimisan",
                    )
                  ) {
                    await deleteProduct(item?.id);
                  }
                }}
                className="border p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Products;
