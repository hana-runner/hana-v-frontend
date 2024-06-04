import React from "react";

function CancelBtn() {
  const handleCancelClick = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      className="w-[144px] h-[48px] rounded-[15px] text-white bg-hanaSilver"
      onClick={handleCancelClick}
    >
      취소
    </button>
  );
}

export default CancelBtn;
