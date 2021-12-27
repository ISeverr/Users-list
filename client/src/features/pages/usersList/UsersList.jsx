import { useEffect, useState, useCallback } from "react";
import { Col, Container, Row, Table, Button, Form } from "react-bootstrap";
import { useHttp } from "../../../hooks/http.hook";

function UsersList() {
  const { request, loading } = useHttp();
  const [users, setUsers] = useState(null);

  const getUsers = useCallback(async () => {
    try {
      const usersList = await request("/api/getUsers/getUsers", "GET");
      setUsers(usersList);
    } catch (e) {
      alert(e);
    }
  }, [request]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [checkedUsers, setCheckedUsers] = useState(false);
  const [deleteId, setDeleteId] = useState({});

  const checkAllHandler = () => {
    const obj = users
      .map((user) => user._id)
      .reduce((obj, key) => {
        obj[key] = true;
        return obj;
      }, {});
    setCheckedUsers(obj);
    setDeleteId({ ...deleteId, "_id": Object.keys(checkedUsers)  });
  };

  const deleteUser = useCallback(async () => {
    try {
      setDeleteId({ ...deleteId, "_id": Object.keys(checkedUsers)  });
      const data = await request("/api/deleteUsers/deleteUsers", "POST", { ...deleteId});
      console.log(data,"deleted")
    } catch (e) {
      console.log(e)
    }
  }, [checkedUsers, deleteId, request]) 



  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Table
            className="d-flex justify-content-center"
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>
                  <Button onClick={deleteUser} disabled={loading} variant="primary" size="sm">
                  Delete user
                  </Button>
                </th>
                <th>
                  <Button variant="primary" size="sm">
                    Block user
                  </Button>
                </th>
              </tr>
            </thead>
          </Table>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={checkAllHandler}
                    >
                      Select all
                    </Button>
                    <Button
                      onClick={() => setCheckedUsers(null)}
                      variant="primary"
                      size="sm"
                    >
                      Remove selection
                    </Button>
                  </div>
                </th>
                <th>Id</th>
                <th>Email adress</th>
                <th>Nicname</th>
                <th>Registration Date</th>
                <th>Last login date</th>
                <th>User status</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={
                          (checkedUsers && checkedUsers[user._id]) || false
                        }
                        onChange={(e) => {
                          setCheckedUsers({
                            ...checkedUsers,
                            [user._id]: e.target.checked,
                          });
                        }}
                        aria-label="option 1"
                        label="select "
                      />
                    </td>
                    <td key={user._id}>{user._id}</td>
                    <td key={user.email}>{user.email}</td>
                    <td key={user.nickname}>{user.nickname}</td>
                    <td key={user.registrationDate}>{user.registrationDate}</td>
                    <td key={user.loginDate}>{user.loginDate}</td>
                    <td key={user.userStatus}>{user.userStatus}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UsersList;
