import Button from '@components/button';

export default function ShareCollectionButton() {
  return (
    <div className="sns">
      <Button
        icon="twitter"
        iconColor="lignt-violet"
        background="ebony"
        size="small"
        border="round"
      />
      <Button
        icon="facebook"
        iconColor="lignt-violet"
        background="ebony"
        size="small"
        border="round"
      />
      <Button
        icon="instagram"
        iconColor="lignt-violet"
        background="ebony"
        size="small"
        border="round"
      />
    </div>
  );
}
