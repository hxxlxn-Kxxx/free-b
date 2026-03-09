import AtomBadge from "@/src/components/atoms/AtomBadge";

type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <AtomBadge tone={status} />;
}
