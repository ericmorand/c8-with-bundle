import tape from "tape";
import {foo} from "../main/lib/foo";
import {createMock} from "./src/main/should-not-be-a-source";

createMock();

tape('foo', ({same, end}) => {
  same(foo(), 'foo');

  end();
});