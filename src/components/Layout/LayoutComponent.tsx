import Head from "next/head";

type TProps = {
  children?: React.ReactNode;
};

const LayoutComponent = ({ children }: TProps) => {
  return (
    <div className="flex h-full min-h-screen flex-col overflow-hidden font-sans mx-auto w-full max-w-[1440px] bg-background px-4 pb-10 md:px-6">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title key="title">Fotexnet Homework</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </Head>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
};

export default LayoutComponent;
