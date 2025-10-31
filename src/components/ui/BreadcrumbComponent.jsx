/* eslint-disable react/prop-types */

import { Link } from "@tanstack/react-router";
import { Breadcrumb } from "antd";
import { cn } from "../../utils/classname.util";
/**
 * @param {import("antd").BreadcrumbProps} props
 * @param {import("antd").BreadcrumbItemProps} props
 */
const BreadcrumbComponent = ({ items, className, ...rest }) => {
  const formattedItems = items?.map((item) => {
    if (item?.href) {
      return {
        title: <Link to={item.href}>{item.title}</Link>,
      };
    }
    return {
      title: item.title,
    };
  });
  console.log(formattedItems);
  return (
    <div className={cn(className)}>
      <Breadcrumb
        className="text-xs!"
        items={items?.map((item) => {
          if (item.href) {
            return {
              title: <Link to={item.href}>{item.title}</Link>,
            };
          }
          return {
            title: item.title,
          };
        })}
        {...rest}
      />
    </div>
  );
};

export default BreadcrumbComponent;
