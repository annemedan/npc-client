import notFound from "./—Pngtree—404 error page not found_5276232.png";
function ErrorPage() {
  return (
    <div>
      <h1>404 Not Found</h1>

      <img src={notFound} alt="404 Not Found" className="error-img" />
    </div>
  );
}

export default ErrorPage;
