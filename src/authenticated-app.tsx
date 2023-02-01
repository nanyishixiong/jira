import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { Button, Dropdown } from "antd";
import styled from "@emotion/styled";
import { Row } from "components/lib";
// 一种以react组件引入svg图片的方式，优点：支持样式配置
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Navigate, Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 看从内容出发还是布局出发？
 * 从内容出发：有一组内容（数量一般不固定），希望均匀分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再填充元素
 * 从内容出发用flex
 * 从布局出发用grid
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate to={"/projects"} />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true} marginBottom={1}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRouter}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                label: (
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                ),
              },
            ],
          }}
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi，{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const resetRouter = () => (window.location.href = window.location.origin);

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
