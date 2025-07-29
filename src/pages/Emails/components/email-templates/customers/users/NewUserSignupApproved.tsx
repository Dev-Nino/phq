import { useUser } from '../../../../../../contexts/UserContext';

export const NewUserSignupApproved = () => {
  const { user: userContext } = useUser();
  const { emails, project, user } = userContext ?? {};
  const { customer } = emails ?? {};

  const portal =
    'http://' +
    (project?.custom_domain && project.custom_domain.length > 0
      ? project.custom_domain
      : project?.portal_subdomain && project.portal_subdomain.length
        ? project.portal_subdomain + '.producthq.io'
        : '');

  return (
    <div>
      <div className="mb-3">
        <div className="text-sm text-gray-500">
          {`From: ProductHQ Updates ${customer?.sender_settings ?? 'noreply@producthq.io'}`}
        </div>
        <div className="text-sm text-gray-500">To: customer@company.com</div>
        <div className="text-sm text-gray-500">
          Subject: Your account has been approved
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-[18px] font-medium text-gray-900 mb-2">
          Hey <span className="text-gray-500">[First Name]</span>! 👋
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          Your account has been approved.
        </p>

        <p className="text-[14px] text-gray-700 mb-4">
          You can now login and add your first feature request.
        </p>

        <button
          className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4"
          onClick={() => window.open(portal, '_blank', 'noopener, noreferrer')}
        >
          Start here
        </button>

        <p className="text-[14px] text-gray-700 mb-2">
          The <span className="text-gray-500">{user?.company_name}</span> Team
        </p>

        <p className="text-[13px] text-gray-500">
          Help us improve -{' '}
          <a
            href="https://feedback.producthq.io"
            className="text-[#5a00cd]"
            rel="noopener, noreferrer"
            target="_blank"
          >
            share your thoughts
          </a>
        </p>
      </div>
    </div>
  );
};
