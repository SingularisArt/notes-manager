import Topbar from "components/common/Topbar/Topbar";
import "./TrashPage.css";

type TrashProps = {};

const TrashPage: React.FC<TrashProps> = () => {
  return (
    <div>
      <Topbar title="Trash" />
    </div>
  );
};

export default TrashPage;
