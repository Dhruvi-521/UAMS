import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportCard = ({ report }) => {
    const navigate = useNavigate();
    const { icon: Icon, title, description, route, color, bgColor, badge, badgeType, meta, updated } = report;

    return (
        <div
            className="report-card"
            style={{ '--card-accent': color }}
            onClick={() => navigate(report.route)}
        >
            <div className="report-card-header">
                <div className="report-card-icon" style={{ background: bgColor, color: color }}>
                    <Icon size={22} />
                </div>
                {badge && (
                    <span className={`report-card-badge badge-${badgeType || 'active'}`}>
                        {badge}
                    </span>
                )}
            </div>

            <div>
                <div className="report-card-title">{title}</div>
                <div className="report-card-desc">{description}</div>
            </div>

            {meta && (
                <div className="report-card-meta">
                    {meta.map((m, i) => (
                        <span key={i} className="meta-pill">
                            {m.icon && <m.icon size={11} />} {m.label}
                        </span>
                    ))}
                </div>
            )}

            <div className="report-card-footer">
                <button
                    className="btn-view-report"
                    style={{ background: color }}
                    onClick={(e) => { e.stopPropagation(); navigate(route); }}
                >
                    View Full Report <ArrowRight size={14} />
                </button>
                {updated && (
                    <span className="report-updated">
                        <Clock size={11} /> {updated}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ReportCard;
