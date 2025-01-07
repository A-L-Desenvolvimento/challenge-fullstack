import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Top({ title, link, icon, text, variant }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1>{title}</h1>
      <Button variant={variant} as={Link} to={link}>
        {icon} {text}
      </Button>
    </div>
  );
}
