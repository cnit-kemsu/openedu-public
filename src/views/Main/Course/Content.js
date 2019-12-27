function renderSection(props, index, enrolled) {
  return <Section key={props.id} index={index} enrolled={enrolled} {...props} />;
}
{courseDeliveryInstance.sections.map((props, index) => renderSection(props, index + 1, courseDeliveryInstance.enrolled))}