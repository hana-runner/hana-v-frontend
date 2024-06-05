// 은행별 로고 이미지 추가

const AccountCard = ({
  accountName,
  accountType,
  accountNumber,
  balance,
}: AccountType) => {
  return (
    <div className="bg-white flex flex-col items-start mx-4 mb-4 rounded-3xl shadow-md pl-4 pr-8 py-8">
      <div className="flex items-center mb-1">
        <img src="/img/hana_logo.png" className="w-6 h-6 mr-1" />
        <span className="font-hanaMedium">{accountName}</span>
      </div>
      <div className="flex items-center">
        <span className="text-hanaSilver text-xs mr-1">{accountType}</span>
        <span className="text-hanaSilver text-xs">{accountNumber}</span>
      </div>
      <div className="flex items-center pl-12 pr-8 mt-8">
        <div className="font-hanaBold text-2xl mr-1">
          {balance.toLocaleString()}
        </div>
        <span className="mr-1">원</span>
        <div className="bg-hanaSilver rounded-2xl text-xs px-2 py-0">숨김</div>
      </div>
    </div>
  );
};

export default AccountCard;
