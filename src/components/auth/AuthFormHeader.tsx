interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export const AuthFormHeader = ({ title, description }: AuthFormHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};