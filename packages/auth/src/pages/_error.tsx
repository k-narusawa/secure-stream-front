// pages/_error.tsx
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode: number | undefined;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div>
      <h1>
        {statusCode === 500 ? "サーバー内部エラー" : "エラーが発生しました"}
      </h1>
      {/* ここに任意のスタイリングや追加情報を加える */}
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
