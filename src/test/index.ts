import tape from "tape";
import {foo} from "../main/lib/foo";

tape('foo', ({same, end}) => {
  same(foo(), 'foo');

  end();
});