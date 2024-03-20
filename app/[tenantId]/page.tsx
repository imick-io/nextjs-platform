interface Props {
  params: { tenantId: string };
  searchParams: { [key: string]: string };
}

export default function Page(props: Props) {
  return (
    <div>
      <h1>Tenant website</h1>
      <p>{`tenantId: ${props.params.tenantId}`}</p>
    </div>
  );
}
