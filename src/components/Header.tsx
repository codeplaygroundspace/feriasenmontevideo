const Header: React.FC = () => {
  return (
    <header className="bg-white text-black p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Mercados de Montevideo
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Descubre los mercados callejeros de la capital
        </p>
      </div>
    </header>
  );
};

export default Header;
