import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuCard, MonthlyConsumption, MyAccount, Navbar } from "../components";
import { useQueries } from "@tanstack/react-query";
import ApiClient from "../apis/apiClient";
import Logout from "../components/users/Logout";

const Home = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["accounts"],
        queryFn: async () => {
          const response = await ApiClient.getInstance().getAccounts();
          return response;
        },
      },
      {
        queryKey: ["expenses"],
        queryFn: async () => {
          const response =
            await ApiClient.getInstance().getExpensePerCategories();
          return response;
        },
      },
    ],
  });

  const accountsQuery = results[0];
  const expensesQuery = results[1];

  const accounts: AccountType[] = accountsQuery.data?.data || [];
  const expenses: ExpenseType[] = expensesQuery.data?.data || [];

  const isLoading = accountsQuery.isLoading || expensesQuery.isLoading;

  const navigate = useNavigate();

  return (
    <section>
      <Navbar option={false} title="HANA" logo={true} />
      <Logout
        text="간이 로그아웃. 메뉴 구현시 삭제 예정"
        className="btn-primary"
      />
      {isLoading ? (
        <div>is Loading...</div>
      ) : (
        <>
          <MyAccount accounts={accounts} />
          <MonthlyConsumption expenses={expenses} />
        </>
      )}
      <MenuCard
        title="나의 관심사"
        description="나의 관심사를 설정하여 비슷한 관심사를 가진 사람들과 소비를 비교해 보아요!"
        color="#BA75CC"
        // 관심사 페이지로 이동
        clickHandler={() => navigate("/interests")}
      />
      <MenuCard
        title="나의 거래 이력"
        description="나의 거래 이력을 조회하고 소비 내역을 카테고리에 따라 분류해 보아요!"
        color="#757ECC"
        // 거래 내역 조회 페이지로 이동
        clickHandler={() => navigate("/")}
      />
    </section>
  );
};

export default Home;
