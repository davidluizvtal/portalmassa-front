import { Generate } from "@pages/Generate";
import { Systems } from "@pages/Generate/components/Systems";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { TestGeneration } from "@pages/TestGeneration";
import { CreateTest } from "@pages/TestGeneration/components/create";
import { User } from "@pages/User";
import { ListUsers } from "@pages/User/components/List";
import { CreateUser } from "@pages/User/components/create";
import { EditUser } from "@pages/User/components/edit";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layout/auth";
import { RootLayout } from "../layout/root";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="user/list" element={<ListUsers />} />
        <Route path="user/edit" element={<EditUser />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="test" element={<TestGeneration />} />
        <Route path="test/create" element={<CreateTest />} />

        <Route path="generate" element={<Generate />} />
        {/* systemsVtal.map((system, index) => {
            <Route
              key={system.name + index}
              path={system.path}
              element={<Systems name={system.name} />}
            />;
          }) */}
        <Route
          path="generate/FTTH-BITSTREAM"
          element={<Systems name="FTTH-BITSTREAM" />}
        />
        <Route
          path="generate/FTTH-WHITELABEL"
          element={<Systems name="FTTH-WHITELABEL" />}
        />
        <Route
          path="generate/FTTH-VOIP"
          element={<Systems name="FTTH-VOIP" />}
        />
        <Route path="generate/NETWIN" element={<Systems name="NETWIN" />} />
        <Route path="generate/NETQ" element={<Systems name="NETQ" />} />
        <Route path="generate/BSS" element={<Systems name="BSS" />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" index element={<Login />} />
      </Route>
    </Routes>
  );
}
