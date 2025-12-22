interface LabelCardProps {
  title?: string;
  description?: string;
}

const LabelCard = ({ title, description }: LabelCardProps) => {
  return (
    <div className="labelCard">
      <strong className="labelCard-title">{title || 'Label'}</strong>
      <p className="labelCard-description">{description || '421.250 km'}</p>
    </div>
  );
};

export default LabelCard;
